import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

// Web Worker execution
self.onmessage = (event: MessageEvent<{ code: string }>) => {
  const { code } = event.data;
  let result: string[] = [];
  let executionFinished = false;

  // Override console.log to capture logs
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    result.push(args.map((arg) => String(arg)).join(" "));
    originalConsoleLog(...args);
  };

  // Set execution timeout (force stop infinite loops)
  const timeout = setTimeout(() => {
    if (!executionFinished) {
      result.push("Error: Execution timed out (Possible infinite loop).");
      self.postMessage(result);
      self.close(); // Stop worker
    }
  }, 3000); // 3-second time limit

  try {
    // Parse and transform user code
    const transformedCode = addLoopProtection(code);

    // Run the transformed code inside a safe execution block
    eval(transformedCode);
    executionFinished = true; // Mark execution as complete
  } catch (error: any) {
    result.push(`Error: ${error.message}`);
  } finally {
    clearTimeout(timeout);
    self.postMessage(result); // Send logs and errors back
    console.log = originalConsoleLog;
  }
};

/**
 * Function to parse and transform user code to include loop protection
 */
function addLoopProtection(code: string): string {
  const ast = parser.parse(code, { sourceType: "module" });

  traverse(ast, {
    WhileStatement(path) {
      injectLoopCheck(path);
    },
    ForStatement(path) {
      injectLoopCheck(path);
    },
    DoWhileStatement(path) {
      injectLoopCheck(path);
    },
  });

  const transformedCode = generate(ast).code;
  return `
    (function() {
      let __loopCounter = 0;
      const __loopLimit = 1000; // Max iterations allowed
      function __checkLoop() {
        if (++__loopCounter > __loopLimit) {
          throw new Error("Detected infinite loop. Execution stopped.");
        }
      }
      ${transformedCode}
    })();
  `;
}

/**
 * Injects loop protection inside a loop node
 */
function injectLoopCheck(path: any) {
  if (path.node.body.type === "BlockStatement") {
    path.node.body.body.unshift({
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        callee: { type: "Identifier", name: "__checkLoop" },
        arguments: [],
      },
    });
  } else {
    path.node.body = {
      type: "BlockStatement",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: { type: "Identifier", name: "__checkLoop" },
            arguments: [],
          },
        },
        path.node.body,
      ],
    };
  }
}
