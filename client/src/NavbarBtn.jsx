export default function NavbarBtn({ name, dest, action }) {
    return (
        <a
            onClick={action}
            href={dest}
            className="text-xl font-semibold text-white px-4 py-2">
            {name}
        </a>
    );
}
