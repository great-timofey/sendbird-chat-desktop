import SendBird from 'sendbird';

const sb = new SendBird({
  appId: '0867B9E8-AC7A-4744-A99F-2420FA273CB0',
});

export const SBconnect = (sbUserId, sbAccessToken) =>
  sb.connect(
    sbUserId,
    sbAccessToken,
    (user, error) =>
      new Promise((res, rej) => {
        if (user) {
          res(user);
        } else {
          rej(error);
        }
      })
  );

export const getChannelsList = () => {
  const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
  channelListQuery.includeEmpty = true;
  channelListQuery.limit = 20;

  if (channelListQuery.hasNext) {
    channelListQuery.next((channelList, error) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(channelList);
    });
  }
};
