interface Props {
  message?: string;
}

export default function ErrorMessage({ message }: Props) {
  return !!message ? (
    <p className="mt-0.5 text-sm font-medium text-red-500">{message}</p>
  ) : null;
}
