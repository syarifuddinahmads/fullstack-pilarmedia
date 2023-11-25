import { mocked } from "ts-jest/utils";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { POST } from "./route";

// Mock bcryptjs
jest.mock("bcryptjs", () => ({
  ...jest.requireActual("bcryptjs"),
  hash: jest.fn(),
}));

// Mock prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn(),
    },
  },
}));

describe("POST /api/users/create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user and return JSON response", async () => {
    const mockedHash = mocked(hash);
    const mockedPrisma = mocked(prisma.user.create);

    mockedHash.mockResolvedValue("hashedPassword");
    mockedPrisma.mockResolvedValue({ name: "John Doe", email: "john@example.com" });

    const req = {
      json: jest.fn().mockResolvedValue({ name: "John Doe", email: "john@example.com", password: "password" }),
    } as Request;

    const response = await POST(req);

    expect(response).toEqual(
      new NextResponse(
        JSON.stringify({ user: { name: "John Doe", email: "john@example.com" } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    );

    expect(mockedHash).toHaveBeenCalledWith("password", 12);
    expect(mockedPrisma).toHaveBeenCalledWith({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: "hashedPassword",
      },
    });
  });

  it("should handle errors and return a JSON error response", async () => {
    const mockedHash = mocked(hash);
    const mockedPrisma = mocked(prisma.user.create);

    mockedHash.mockResolvedValue("hashedPassword");
    mockedPrisma.mockRejectedValue(new Error("User creation failed"));

    const req = {
      json: jest.fn().mockResolvedValue({ name: "John Doe", email: "john@example.com", password: "password" }),
    } as Request;

    const response = await POST(req);

    expect(response).toEqual(
      new NextResponse(
        JSON.stringify({
          status: "error",
          message: "User creation failed",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    );

    expect(mockedHash).toHaveBeenCalledWith("password", 12);
    expect(mockedPrisma).toHaveBeenCalledWith({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: "hashedPassword",
      },
    });
  });
});
