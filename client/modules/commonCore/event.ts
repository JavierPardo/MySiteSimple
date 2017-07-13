export const ApplicationStateEvent = {
    Init: "ApplicationStateEvent.Init",
    BeforeReady: "ApplicationStateEvent.BeforeReady",
    Ready: "ApplicationStateEvent.Ready",
    Unload: "ApplicationStateEvent.Unload",
    UnAuthorizeRequest: "UnAuthorizeRequest"
};

export const RountingEvent = {
    RedirectPage: "Redirect.Page"
}

export const LoadingIndicatorEvent = {
    Show: "loading.show",
    Hide: "loading.hide"
};
export const ModalPopUpEvent = {
    Show: "modalPopUp.show",
    Hide: "modalPopUp.hide"
};

export const CommonEvent = {
    ValidationFail: "ValidationFail",
    ShowMessage: "ShowMessage"

};

export const HttpCode = {
    NotFound: 404,
    UnAuthorized: 401,
    Forbidden: 403,
    BadRequest: 400
};

export const AuthenticatedEvent = {
    AuthenticationChanged: "AuthenticationChanged"
};


export const ValidationEvent = {
    ValidationFail: "ValidationFail"
};