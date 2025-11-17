
interface RobotProfileProps {
  name: string;
  status: string;
}

// 2. We tell our function it will receive 'props'
// that match this interface.
function RobotProfile(props: RobotProfileProps) {
  return (
    <div className="profile-card">
      {/* 3. We use curly braces {} to use JavaScript variables
             inside our JSX. */}
      <h2>{props.name}</h2>
      <p>Status: {props.status}</p>
    </div>
  );
}

export default RobotProfile;