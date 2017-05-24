export const ApplicationStateEvent = {
    Init: "ApplicationStateEvent.Init",
    BeforeReady: "ApplicationStateEvent.BeforeReady",
    Ready: "ApplicationStateEvent.Ready",
    Unload: "ApplicationStateEvent.Unload",
    UnAuthorizeRequest: "UnAuthorizeRequest"
};

export const LoadingIndicatorEvent = {
    Show: "loading.show",
    Hide: "loading.hide"
};

export const CommonEvent = {
    ValidationFail: "ValidationFail",
    ShowMessage: "ShowMessage"

};

export const HttpCode = {
    NotFound: 404,
    UnAuthorized: 401,
    BadRequest: 400
};

export const AuthenticatedEvent = {
    AuthenticationChanged: "AuthenticationChanged"
};


export const ValidationEvent = {
    ValidationFail: "ValidationFail"
};