import {createFileRoute} from '@tanstack/react-router'
import Tennis from '../../components/tennis/Tennis'

export const Route = createFileRoute('/_app/tennis')({
  component: Tennis,
})