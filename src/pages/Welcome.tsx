import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';
import AvatarDynamic from './AvatarDynamic';
import TagColorful from './TagColorful';

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <TagColorful />
    <AvatarDynamic />
    <Card>
      <Alert
        message="BIENBENIDO A CLICK"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="https://pro.ant.design/docs/block">
          Que podemos poner a qui.
        </a>
      </Typography.Text>
      <CodePreview> npm run ui</CodePreview>
      <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://pro.ant.design/docs/available-script#npm-run-fetchblocks"
        >
          rutas de ayuda.
        </a>
      </Typography.Text>
      <CodePreview> npm run fetch:blocks</CodePreview>
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      agregue una nuev pagina.{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        bloque de usuario.
      </a>
      。
    </p>
  </PageHeaderWrapper>
);
