import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  text: string;
  end?: boolean;
}

const NLink = ({ to, text, end = false }: Props) => (
  <NavLink
    className={({
      isActive,
      isPending,
    }: {
      isActive: boolean;
      isPending: boolean;
    }) =>
      `m-1 p-1 bg-slate-700 rounded-sm hover:bg-gray-600 transition max-w-40 ${
        (isActive || isPending) && 'bg-blue-600'
      }`
    }
    to={to}
    end={end}
  >
    {text}
  </NavLink>
);

export default NLink;
