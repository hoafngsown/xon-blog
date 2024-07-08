import { ContactRepository } from "@/repository/contact.repo";
import type { ContactBodyType } from "@/types/contact";
import { NextResponse } from "next/server";

export async function GET() {
  const contacts = await ContactRepository.getAll();

  return NextResponse.json(contacts, { status: 200 });
}

export async function POST(request: Request) {
  const body: ContactBodyType = await request.json();

  const newContact = await ContactRepository.create(body);

  return NextResponse.json(newContact, { status: 200 });
}
