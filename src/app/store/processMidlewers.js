import { processWatcher } from "../processWatcher";

export function pendingMidleware(_, action) {
    processWatcher.addLoadingProcess(action.meta.requestId)
}

export function rejectedMidleware(_, action) {
    processWatcher.removeLoadingProcess(action.meta.requestId)
}

export function fulfilledMidleware(_, action) {
    processWatcher.removeLoadingProcess(action.meta.requestId)
    return action.payload
}

const withProcessMidlewares = (actions) => (builder) => {
    actions.forEach((action) => {
        builder
            .addCase(action.pending, pendingMidleware)
            .addCase(action.rejected, rejectedMidleware)
            .addCase(action.fulfilled, fulfilledMidleware)
    })
}

export default withProcessMidlewares