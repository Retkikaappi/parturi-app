import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  text: string;
}

const NLink = ({ to, text }: Props) => (
  <NavLink
    className='m-1 p-1 bg-slate-700 rounded-sm hover:bg-gray-600 transition'
    to={to}
  >
    {text}
  </NavLink>
);

export default NLink;
