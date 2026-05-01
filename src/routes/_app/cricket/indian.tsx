import { createFileRoute } from '@tanstack/react-router'
import IndianPremium from '../../../components/cricket/IndianPremium'

export const Route = createFileRoute('/_app/cricket/indian')({
  component: () => <IndianPremium />
})
