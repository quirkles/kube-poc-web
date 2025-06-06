import {NavLink, useLocation} from "react-router";

interface Props {
}

const classes = {
    active: 'underline',
    inactive: 'hover:underline',
} as const;

export function NavBar(props: Props) {
    const location = useLocation();
    return (
        <nav className="py-4 px-8">
            <ul className="flex gap-2">
                <li className={classes[location.pathname === '/' ? 'active' : 'inactive']}>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li className={classes[location.pathname === '/greet' ? 'active' : 'inactive']}>
                    <NavLink to="/greet">
                        Greet
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}