import { useActionState } from "react";
 
export default function SignOut({action} : {action: () => Promise<void>}) {
    const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction}>
      <button>Sign Out</button>
    </form>
  )

}