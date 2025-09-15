export const getMainPage = () => "/";
export const getProfilePage = () => "/profile";
export const getChatsPage = () => "/chats";
export const getMembersPage = () => "/members";
export const editMemberRouteParams = { userId: ":userId" };
export type EditMemberRouteParams = { userId: string };
export const getMemberProfilePage = ({ userId }: EditMemberRouteParams) => `/members/${userId}`;