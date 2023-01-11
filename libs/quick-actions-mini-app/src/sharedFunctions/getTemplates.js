const { requestBuilder } = require('../requestBuilder');

export default async function getTemplates(authStore) {
  // console.log('✨✨✨✨✨✨✨✨✨✨✨');

  // console.log(authStore);
  try {
    let userRolesArray = await requestBuilder('ciam/userRoles/getUserRoles', {
      userId: authStore.user.id,
    });
    let userRoles = [];
    for (let i = 0; i < userRolesArray.data.rows.length; i++) {
      const element = userRolesArray.data.rows[i].cimRtRoleId;
      userRoles.push(element);
    }
    let allQuickActions = await requestBuilder(
      'communities/quickAction/getTemplates',
      {
        userId: authStore.user.id,
        roles: userRoles,
      }
    );

    const allRoles = allQuickActions.data.rows;
    const favoriteRoles = allQuickActions.data.favorites;
    let finalArray = [];

    if (favoriteRoles.length) {
      for (let i = 0; i < allRoles.length; i++) {
        let boolean = false;
        const element = allRoles[i];
        for (let j = 0; j < favoriteRoles.length; j++) {
          const element2 = favoriteRoles[j];
          if (element2.template.id === element.id) {
            finalArray.unshift({ ...element, favorite: true });
            boolean = true;
            break;
          } else {
            continue;
          }
        }
        if (!boolean) {
          finalArray.push({ ...element, favorite: false });
        }
      }
    } else {
      finalArray = allRoles;
    }
    return finalArray;
  } catch (error) {
    console.log(error);
    return [];
  }
}
