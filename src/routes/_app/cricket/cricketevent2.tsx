import { createFileRoute } from '@tanstack/react-router'
import CricketEvent2 from '../../../components/cricket/CricketEvent2'

export const Route = createFileRoute('/_app/cricket/cricketevent2')({
  component: () => <CricketEvent2 />
})