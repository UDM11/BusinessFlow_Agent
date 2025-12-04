class BusinessFlowError(Exception):
    pass


class SlackError(BusinessFlowError):
    pass


class EmailError(BusinessFlowError):
    pass


class NotionError(BusinessFlowError):
    pass


class SheetsError(BusinessFlowError):
    pass


class AgentError(BusinessFlowError):
    pass
