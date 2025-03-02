import {StateSchema} from "@/app/providers/StoreProvider";
import {createSelector} from "@reduxjs/toolkit";
import {UserRoles} from "../const/user";

export const getUserRoles = (state: StateSchema) => state?.user?.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.some((role) => role.slug === UserRoles.ADMIN))
);

export const isUserModerator = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.some((role) => role.slug === UserRoles.MODERATOR))
);
