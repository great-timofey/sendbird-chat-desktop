import SendBird from 'sendbird';

const sb = new SendBird({
  appId: '0867B9E8-AC7A-4744-A99F-2420FA273CB0',
});

export const SBconnect = (sbUserId, sbAccessToken) =>
  new Promise((res, rej) =>
    sb.connect(
      sbUserId,
      sbAccessToken,
      (user, error) => {
        if (user) {
          res(user);
        } else {
          rej(error);
        }
      }
    )
  );

export const getChannelsList = () =>
  new Promise((res, rej) => {
    const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
    openChannelListQuery.next((channels, error) => {
      if (error) {
        console.log(error);
        rej();
      }
      res(channels);
    });
  });

export const createOpenChannel = (name, coverUrl, data = null) =>
  new Promise((res, rej) => {
    sb.OpenChannel.createChannel(
      name,
      coverUrl,
      data,
      (createdChannel, error) => {
        if (error) {
          console.error(error);
          rej();
        }

        // onCreated
        res(createdChannel);
      }
    );
  });
