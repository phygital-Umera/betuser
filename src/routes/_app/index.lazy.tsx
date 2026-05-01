import {Calendar} from '@/components/common';
import {Home} from '@/pages';
import {createLazyFileRoute} from '@tanstack/react-router';
// import UserDownlineList from '../../components/downline/UserDownlineList';

export const Route = createLazyFileRoute('/_app/')({
  // component: Calendar,
  component: Home,
  // component: () => <UserDownlineList />,
});
