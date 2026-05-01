import { createFileRoute } from '@tanstack/react-router'
import Play from '../../../play/Play'

export const Route = createFileRoute('/_app/play/play')({
  component: Play
})