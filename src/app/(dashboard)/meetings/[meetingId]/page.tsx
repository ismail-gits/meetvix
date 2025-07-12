interface MeetingIdPageProps {
  params: Promise<{ meetingId: string }>;
}

const MeetingIdPage = async ({ params }: MeetingIdPageProps) => {
  const { meetingId } = await params;

  return <div>Meeting ID: {meetingId}</div>;
};

export default MeetingIdPage;
