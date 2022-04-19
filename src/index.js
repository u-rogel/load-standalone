export const loadStandalone = ({
  injectTarget,
  appLoader,
}) => {
  const targetNode = document.querySelector('body')
  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true }

  const nodeToMountTo = document.getElementById(injectTarget)
  let isAppLoaded = false

  const modifyDomNode = (node) => {
    if (node && !isAppLoaded) {
      /* eslint-disable-next-line */
      node.innerHTML = ''
      appLoader()
      isAppLoaded = true
    } else if (!node && isAppLoaded) {
      isAppLoaded = false
    }
  }

  modifyDomNode(nodeToMountTo)

  // Callback function to execute when mutations are observed
  const callback = (mutationsList) => {
    // Use traditional 'for loops' for IE 11
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
