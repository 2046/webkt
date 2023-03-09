export default function compareVersion(
  targetVersion: string,
  currentVersion: string
) {
  const targetVersions = targetVersion.split('.')
  const currentVersions = currentVersion.split('.')

  for (let index = 0; index < targetVersions.length; index++) {
    const target = parseInt(targetVersions[index], 10) || 0
    const current = parseInt(currentVersions[index], 10) || 0

    if (target > current) return -1
    if (target < current) return 1
  }

  return 0
}
