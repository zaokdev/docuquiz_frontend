/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable prettier/prettier */
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {Link} from "@heroui/link"
import { Button } from "@heroui/button";

export const Navbar = () => {
  return <HeroUINavbar maxWidth="xl" position="sticky">
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
      
    </NavbarContent>
          <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/auth/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/auth/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
  </HeroUINavbar>;
};
