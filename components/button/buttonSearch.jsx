import {Search} from '../../lib/icon';

export default function ButtonSearch({onClick, className}) {
    return (
        <button
            className={`flex flex-row items-center justify-center gap-1 md:justify-between button-generic ${className}`}
            type="submit"
            onClick={onClick}
        >
            <div className="hidden md:block">Rechercher</div>
            <Search size="20" />
        </button>
    );
}
