interface Props {
  children: string;
}
const ErrorMessage = ({ children }: Props) => {
  return <div className="error-msg">⚠️ {children}</div>;
};

export default ErrorMessage;
