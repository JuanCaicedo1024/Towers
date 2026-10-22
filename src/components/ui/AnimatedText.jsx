import { TextEffect } from '../../../components/motion-primitives/text-effect';

export default function AnimatedText({ children, delay = 0, per = 'word' }) {
  return (
    <TextEffect
      as="span"
      per={per}
      preset="fade-in-blur"
      delay={delay}
      inView
      className={per === 'line' ? 'block' : 'inline'}
    >
      {children}
    </TextEffect>
  );
}
