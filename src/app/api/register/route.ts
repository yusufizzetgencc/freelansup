import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, username, email, password, image } = body;

    if (!firstName || !lastName || !username || !email || !password) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.toLowerCase() },
          { email: email.toLowerCase() },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Kullanıcı adı veya e-posta zaten kullanılıyor." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = "";
    if (image?.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "avatars",
      });
      imageUrl = uploadRes.secure_url;
    } else {
      imageUrl = image;
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        image: imageUrl,
      },
    });

    return NextResponse.json(
      { message: "Kayıt başarılı!", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
