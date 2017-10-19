import { Promise } from 'es6-promise';

export default async function(appHandle) {
  let rawEntries = [];
  let publicIds = [];
  const pubNamesHandle = await window.safeApp.getContainer(appHandle, '_publicNames');
  const entriesHandle = await window.safeMutableData.getEntries(pubNamesHandle);

  await window.safeMutableDataEntries.forEach(entriesHandle, (key, value) => {
    rawEntries.push({key, value});
  });
  console.log('entries: ', rawEntries);

  const promises = rawEntries.map( async (entry) => {
    console.log(entry);
    if (entry.value.buf.length !== 0) {
      const decKey = await window.safeMutableData.decrypt(pubNamesHandle, entry.key);
      const id = decKey.toString();
      if (id !== '_metadata') { // Skip the metadata entry
        const service = await window.safeMutableData.decrypt(pubNamesHandle, entry.value.buf);
        publicIds.push({ id, service });
        console.log('pubId: ', { id, service });
      }
    }
  });

  await Promise.all(promises);
  return publicIds;
}