import styles from './DialogueBox.module.css';

type DialogueBoxProps = {
  dialogue: string;
};

function DialogueBox({ dialogue }: DialogueBoxProps) {
  return (
    <div className={styles.dialogueBox}>
      <p className={styles.dialogue}>{dialogue}</p>
    </div>
  );
}

export default DialogueBox;
