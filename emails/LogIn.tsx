import { Template } from './components/Template';

type Props = {
  magicLink: string;
};

export const LogInEmail: React.FC<Props> = ({ magicLink }: Props) => {
  return (
    <Template
      heading="Food & Drinks Festival Log-in"
      message="Please click the link below to log-in to the app."
      buttonUrl={magicLink}
      buttonText="Log-in to the app"
    />
  );
};

export default function GetInTouchPreview() {
  return <LogInEmail magicLink="https://example.com" />;
}
