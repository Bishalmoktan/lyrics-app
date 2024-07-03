import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SendEmailProps {
  name: string;
 
}


export const BisaricSendEmail = ({
  name,
}: SendEmailProps) => (
  <Html>
    <Head />
    <Preview>
    Your portal to the lyrical world of music!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Container style={imgContainer}>
        <Img
          src={'https://res.cloudinary.com/dnlbozmuq/image/upload/v1719950840/logo/logo_t1xiss.svg'}
          width="170"
          height="50"
          alt="Bisaric"
          style={logo}
          />
          </Container>
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          Welcome to Bisaric, your portal to the lyrical world of music!
        </Text>
        <Text style={paragraph}>
          Your message has been received. We will be in touch with you soon.
        </Text>
        
        <Text style={paragraph}>
          Best,
          <br />
          The Bisaric team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Kathmandu, Nepal
        </Text>
      </Container>
    </Body>
  </Html>
);

BisaricSendEmail.PreviewProps = {
  name: "Alan",
} as SendEmailProps;

export default BisaricSendEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const imgContainer = {
  backgroundColor: "#0F172A"
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};



const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
