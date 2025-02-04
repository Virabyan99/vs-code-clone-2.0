import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, // ✅ Add this
  DialogTrigger,
} from '@/components/ui/dialog'

import Logo from '@/public/logo.svg'
import Image from 'next/image'

import { signIn, signOut} from '@/app/lib/auth'
import { GitHubAuthButton, GoogleAuthButton } from './SubmitButton'

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex-row justify-center items-center gap-x-2">
          <Image src={Logo} className="size-10" alt="Logo" />
          <h4 className="text-3xl font-semibold">
            Calend<span className="text-primary">Andy</span>
          </h4>
        </DialogHeader>

        {/* ✅ Add DialogTitle for Accessibility */}
        <DialogTitle className="sr-only">Authentication Modal</DialogTitle>

        <div className="flex flex-col gap-3 mt-5">
          <form
            className="w-full"
            action={async () => {
              'use server'
              await signIn('google')
            }}>
            <GoogleAuthButton />
          </form>

          <form
            className="w-full"
            action={async () => {
              'use server'
              await signIn('github')
            }}>
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal;
