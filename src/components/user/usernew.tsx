import { useActionState, useEffect, useState } from "react";

export default function UserNew({action}) {

  const [state, formAction, isPending] = useActionState(action, {
    error: false,
    message: ""
  });

  useEffect(() => {
  }, [state]);


  if(state.error) return <div>{state.message}</div>

  return (
    <div>NEW
          {!state.error &&
            <div>{state.message}</div>
            }
          <form action={formAction}>
          <input name="name" />
          <input name="email" />
          <input name="password" />
          <input type="submit" value={"Save"}></input>
          </form>
    </div>
  );
}