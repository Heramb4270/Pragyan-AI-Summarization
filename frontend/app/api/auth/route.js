import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const POST = async (req, res) => {
  let message, status;

  const data = await req.json();

  const username = data.name;
  const password = data.password;
  const email = data.email;
  console.log(username, password, email);
  const user = await query({
    query: "INSERT INTO `user`(`name`, `email`, `password`) VALUES (?,?,?)",
    values: [username, email, password],
  });

  if (user.error) {
    message = "Something went wrong";
    status = 500;
  } else {
    message = "user added successfully";
    status = 201;
  }
  return NextResponse.json({ message: message }, { status: status });
};
