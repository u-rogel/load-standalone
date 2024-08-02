export const loadStandalone = ({
  injectTarget,
  appLoader,
}: {
  injectTarget: string,
  appLoader: () => () => void
}) => {
  const targetNode = document.querySelector('body')
  if (targetNode == null) {
    throw new Error('DOM must have a body')
  }
  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true }

  const nodeToMountTo = document.getElementById(injectTarget)
  let isAppLoaded = false
  let appUnmount: null | (() => void) = null

  const modifyDomNode = (node: HTMLElement | null) => {
    if (node && !isAppLoaded) {
      /* eslint-disable-next-line */
      node.innerHTML = ''
      appUnmount = appLoader()
      isAppLoaded = true
    } else if (!node && isAppLoaded) {
      isAppLoaded = false
      if (appUnmount) {
        appUnmount()
      }
    }
  }

  modifyDomNode(nodeToMountTo)

  // Callback function to execute when mutations are observed
  const callback = (mutationsList: MutationRecord[]) => {
    const nodeToObserve = document.getElementById(injectTarget)
    mutationsList.forEach(() => modifyDomNode(nodeToObserve))
  }

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback)

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config)

  // Later, you can stop observing
  return () => observer.disconnect()
}
