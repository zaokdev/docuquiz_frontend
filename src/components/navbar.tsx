/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { verify, isLoggedIn, setSignIn, settingUser, signingOut } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    verify()
      .then((result: any) => {
        const { isAuthenticated } = result;
        setSignIn(isAuthenticated);
        if (isAuthenticated) {
          settingUser(result.decoded);
        }
      })
      .catch((error: any) => console.error(error));
  }, []);

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="bg-blue-50">
      <NavbarBrand>
        <p className="font-bold text-inherit">Docuquiz</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/answer?type=local">
            Quiz local
          </Link>
        </NavbarItem>
        {isLoggedIn && (
          <NavbarItem>
            <Link color="foreground" href="/all_quizzes">
              Mis Quizzes
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        {isLoggedIn ? (
          <NavbarItem>
            <Button
              color="primary"
              variant="flat"
              onPress={() => {
                signingOut().then(() => {
                  window.location.href = "/";
                });
              }}
            >
              Sign Out
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/auth/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/register"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
};
