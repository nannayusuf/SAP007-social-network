import { signIn } from "./login.js";

describe("SignIn", () => {
  it("should be a function", () => {
    expect(typeof signIn).toBe("function");
  });
});
