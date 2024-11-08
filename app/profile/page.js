// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  // const session = await getServerSession(authOptions);

  // if (!session) {

  //   return <p>Redirecting to login...</p>;
  // }

  return (
    <div>
      <h1>Welcome,
         {/* {session.user.email} */}
         </h1>
    </div>
  );
}
