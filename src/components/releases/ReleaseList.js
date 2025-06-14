import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../common/Button';
import { getChannelColor } from '../../styles/theme';
import {
  getReleaseVersion,
  getReleaseDate,
  getReleaseChannel,
  getReleaseArchitecture,
  getReleaseDeviceId,
  getReleaseProductType,
  getProductDisplayName,
  getReleaseDownloadUrl,
  truncateText
} from '../../utils/releaseUtils';

const ReleaseList = ({ releases }) => {
  const navigate = useNavigate();

  const handleDownload = (releaseId) => {
    navigate(`/download/${releaseId}`);
  };

  return (
    <ListContainer>
      <ListHeader>
        <HeaderCell width="25%">Product & Version</HeaderCell>
        <HeaderCell width="15%">Channel</HeaderCell>
        <HeaderCell width="15%">Date</HeaderCell>
        <HeaderCell width="20%">Architecture</HeaderCell>
        <HeaderCell width="15%">Device</HeaderCell>
        <HeaderCell width="10%">Actions</HeaderCell>
      </ListHeader>

      <ListBody>
        {releases.map((release) => (
          <ReleaseRow key={release.id} release={release} onDownload={handleDownload} />
        ))}
      </ListBody>
    </ListContainer>
  );
};

const ReleaseRow = ({ release, onDownload }) => {
  const version = getReleaseVersion(release);
  const date = getReleaseDate(release);
  const channel = getReleaseChannel(release);
  const architecture = getReleaseArchitecture(release);
  const deviceId = getReleaseDeviceId(release);
  const productType = getReleaseProductType(release);
  const productName = getProductDisplayName(productType);
  const downloadUrl = getReleaseDownloadUrl(release);

  return (
    <ListRow>
      <ListCell width="25%">
        <ProductInfo>
          <ProductName>{productName}</ProductName>
          <VersionText>{version}</VersionText>
        </ProductInfo>
      </ListCell>
      
      <ListCell width="15%">
        <ChannelBadge $color={getChannelColor(channel)}>
          {channel}
        </ChannelBadge>
      </ListCell>
      
      <ListCell width="15%">
        <DateText>{date}</DateText>
      </ListCell>
      
      <ListCell width="20%">
        <ArchText>{truncateText(architecture, 25)}</ArchText>
      </ListCell>
      
      <ListCell width="15%">
        <DeviceText>{truncateText(deviceId, 20)}</DeviceText>
      </ListCell>
      
      <ListCell width="10%">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onDownload(release.id)}
          disabled={!downloadUrl}
        >
          Download
        </Button>
      </ListCell>
    </ListRow>
  );
};

const ListContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.lg};
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const ListHeader = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
`;

const HeaderCell = styled.div`
  flex: 0 0 ${props => props.width};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ListBody = styled.div`
  max-height: 70vh;
  overflow-y: auto;
`;

const ListRow = styled.div`
  display: flex;
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: background-color ${props => props.theme.transitions.fast};
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.colors.cardBackgroundHover};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ListCell = styled.div`
  flex: 0 0 ${props => props.width};
  display: flex;
  align-items: center;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const ProductName = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
`;

const VersionText = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.primary};
  font-family: monospace;
`;

const ChannelBadge = styled.span`
  background-color: ${props => props.$color};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.radii.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DateText = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

const ArchText = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-family: monospace;
`;

const DeviceText = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-family: monospace;
`;

export default ReleaseList;