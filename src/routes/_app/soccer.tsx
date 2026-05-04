import {createFileRoute} from '@tanstack/react-router'
import Soccer from '../../components/soccer/Soccer'

export const Route = createFileRoute('/_app/soccer')({
  component: Soccer,
})