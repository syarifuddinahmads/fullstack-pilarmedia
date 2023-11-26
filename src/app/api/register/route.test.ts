import { hash } from "bcryptjs";
import { POST } from "./route";
import { prisma } from "@/lib/prisma";

jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockReturnValue("hashedPassword"),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn().mockReturnValue({
        name: "Test User",
        email: "test@example.com",
      }),
    },
  },
}));

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      }),
    };

    const response = await POST(req as any);

    expect(response).toEqual({
      status: 200,
      json: {
        user: {
          name: "Test User",
          email: "test@example.com",
        },
      },
    });

    // Verifikasi bahwa hash dan create dari Prisma telah dipanggil dengan benar
    expect(hash).toHaveBeenCalledWith("password123", 12);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "hashedPassword",
      },
    });
  });

  it("should handle errors", async () => {
    const req = {
      json: jest.fn().mockRejectedValue(new Error("Test error")),
    };

    const response = await POST(req as any);

    expect(response).toEqual({
      status: 500,
      body: JSON.stringify({
        status: "error",
        message: "Test error",
      }),
    });
  });
});
