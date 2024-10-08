import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';

type Props = {
  preview?: string;
  heading: string;
  message: string;
  buttonUrl: string;
  buttonText: string;
};

export function Template({
  preview,
  heading,
  message,
  buttonUrl,
  buttonText,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>{preview || heading}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={headingStyle}>{heading}</Heading>

          <Text style={paragraph}>{message}</Text>

          <Button href={buttonUrl} style={button}>
            {buttonText}
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f6f6',
  fontFamily:
    '"Gill Sans",-apple-system,BlinkMacSystemFont,Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '20px auto',
  padding: '20px',
  width: '560px',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  textAlign: 'center' as const,
};

const headingStyle = {
  fontSize: '32px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#5d5745',
  padding: '0 0 10px 0',
};

const paragraph = {
  margin: '0 0 30px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#5d5745',
};

const button = {
  padding: '12px 16px',
  backgroundColor: '#C4D143',
  color: '#244635',
  width: '50%',
  borderRadius: '4px',
  textAlign: 'center' as const,
  fontSize: '16px',
};
