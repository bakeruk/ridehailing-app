/// <reference types="@types/jest" />

import { SPLYT_OFFICES } from "src/constants";
import { findNearestSplytOffice } from "src/utils/helpers";

describe("findNearestSplytOffice() utility helper", () => {
  const bristolGeolocation = {
    latitude: 51.55764388753977,
    longitude: -2.407595392452382
  };

  const sydneyGeolocation = {
    latitude: -33.8481647,
    longitude: 150.7918936
  };

  it("bristol based user should find London as nearest office", () => {
    const nearestSplytOffice = findNearestSplytOffice(bristolGeolocation.latitude, bristolGeolocation.longitude);
    const expectResult = SPLYT_OFFICES.find(office => office.name === "london");

    expect(nearestSplytOffice).toEqual(expectResult);
  });

  it("sydney based user should find Singapore as nearest office", () => {
    const nearestSplytOffice = findNearestSplytOffice(sydneyGeolocation.latitude, sydneyGeolocation.longitude);
    const expectResult = SPLYT_OFFICES.find(office => office.name === "singapore");

    expect(nearestSplytOffice).toEqual(expectResult);
  });
});
