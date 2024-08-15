import NavItem from './NavItem';
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerDescription,
} from '@/components/ui/drawer';
import { AlignJustify } from 'lucide-react';

function NavBar({ username }: { readonly username: string }) {
    return (
        <>
            <nav className="sticky left-0 top-20 mt-20 hidden h-full w-fit flex-col xl:flex">
                <NavItem link="/profile" text={username} />
                <NavItem link="/workouts" text="Workouts" />
                <NavItem link="/exercises" text="Exercises" />
                <NavItem link="/" text="Log Out" />
            </nav>

            <nav className="sticky left-0 top-0 z-50 hidden h-full w-full items-center justify-between bg-white md:flex xl:hidden">
                <NavItem link="/profile" text={username} />
                <NavItem link="/workouts" text="Workouts" />
                <NavItem link="/exercises" text="Exercises" />
                <NavItem link="/" text="Log Out" />
            </nav>

            <div
                id="drawer"
                className="fixed right-4 top-4 z-50 flex items-center justify-center rounded-md border bg-white p-2 md:hidden"
            >
                <Drawer>
                    <DrawerTrigger>
                        <AlignJustify></AlignJustify>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerTitle></DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                        <NavItem link="/profile" text={username} />
                        <NavItem link="/workouts" text="Workouts" />
                        <NavItem link="/exercises" text="Exercises" />
                        <NavItem link="/" text="Log Out" />
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}

export default NavBar;
