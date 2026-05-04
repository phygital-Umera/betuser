import { createFileRoute } from '@tanstack/react-router'
import Sports from '../../play/Sports'

export const Route = createFileRoute('/_app/sports')({
  component: Sports
})