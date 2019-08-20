function detectionSuggestion(data, data1) {
  let edit = {};
  // Convert empty fields to an empty string so we can use validator functions
  if (data.contributorName !== data1.contributorName) {
    edit = Object.assign(edit, { contributorName: { past: data.contributorName, now: data1.contributorName } });
  }
  if (data.contributorEmail !== data1.contributorEmail) {
    edit = Object.assign(edit, { contributorEmail: { past: data.contributorEmail, now: data1.contributorEmail } });
  }
  if (data.contributorTeam !== data1.contributorTeam) {
    edit = Object.assign(edit, { contributorTeam: { past: data.contributorTeam, now: data1.contributorTeam } });
  }
  if (data.category !== data1.category) {
    edit = Object.assign(edit, { category: { past: data.category, now: data1.category } });
  }
  if (data.targetedSystem !== data1.targetedSystem) {
    edit = Object.assign(edit, { targetedSystem: { past: data.targetedSystem, now: data1.targetedSystem } });
  }
  if (data.description !== data1.description) {
    edit = Object.assign(edit, { description: { past: data.description, now: data1.description } });
  }
  if (data.personDayCurrent !== data1.personDayCurrent) {
    edit = Object.assign(edit, { personDayCurrent: { past: data.personDayCurrent, now: data1.personDayCurrent } });
  }
  if (data.personDayFuture !== data1.personDayFuture) {
    edit = Object.assign(edit, { personDayFuture: { past: data.personDayFuture, now: data1.personDayFuture } });
  }
  if (data.cost !== data1.cost) {
    edit = Object.assign(edit, { cost: { past: data.cost, now: data1.cost } });
  }
  if (data.gatewayStatus !== data1.gatewayStatus) {
    edit = Object.assign(edit, { gatewayStatus: { past: data.gatewayStatus, now: data1.gatewayStatus } });
  }
  if (data.approvalStatus !== data1.approvalStatus) {
    edit = Object.assign(edit, { approvalStatus: { past: data.approvalStatus, now: data1.approvalStatus } });
  }
  if (data.remark !== data1.remark) {
    edit = Object.assign(edit, { remark: { past: data.remark, now: data1.remark } });
  }
  if (data.title !== data1.title) {
    edit = Object.assign(edit, { title: { past: data.title, now: data1.title } });
  }
  return edit;
}

export default detectionSuggestion;
