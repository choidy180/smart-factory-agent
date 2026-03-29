import { DocumentIcon, SearchIcon } from '@/components/icons/AppIcons';
import { buildReferenceParagraphs } from '@/components/realtime/realtime.constants';
import {
  CardBody,
  PanelActionButton,
  PanelHeader,
  PanelIconWrap,
  PanelSubTitle,
  PanelTitle,
  PanelTitleGroup,
  PanelTitleTextGroup,
  ReferenceBullet,
  ReferenceHeroCard,
  ReferenceHeroLabel,
  ReferenceHeroSubTitle,
  ReferenceHeroTitle,
  ReferenceList,
  ReferenceListItem,
  ReferenceListText,
  ReferenceListTitle,
  ReferenceTextGroup,
  ReportCard,
  TextBlock
} from '@/components/realtime/reportPrimitives';
import type { Alarm } from '@/types/alarm';

interface ReferenceReportCardProps {
  alarm: Alarm;
  onAsk: () => void;
}

export default function ReferenceReportCard({ alarm, onAsk }: ReferenceReportCardProps) {
  const paragraphs = buildReferenceParagraphs(alarm);
  const leadReference = alarm.references[0];
  const remainingReferences = alarm.references.slice(1);

  return (
    <ReportCard>
      <PanelHeader>
        <PanelTitleGroup>
          <PanelIconWrap>
            <DocumentIcon size={18} />
          </PanelIconWrap>
          <PanelTitleTextGroup>
            <PanelTitle>상세 레퍼런스</PanelTitle>
            <PanelSubTitle>표준 문서 · 유사 케이스 · 점검 매뉴얼</PanelSubTitle>
          </PanelTitleTextGroup>
        </PanelTitleGroup>

        <PanelActionButton type="button" onClick={onAsk}>
          검색
          <SearchIcon size={14} />
        </PanelActionButton>
      </PanelHeader>

      <CardBody>
        {leadReference ? (
          <ReferenceHeroCard>
            <ReferenceHeroLabel>{leadReference.category}</ReferenceHeroLabel>
            <ReferenceHeroTitle>{leadReference.title}</ReferenceHeroTitle>
            <ReferenceHeroSubTitle>{leadReference.subtitle}</ReferenceHeroSubTitle>
          </ReferenceHeroCard>
        ) : null}

        {paragraphs.map((paragraph) => (
          <TextBlock key={paragraph}>{paragraph}</TextBlock>
        ))}

        <ReferenceList>
          {remainingReferences.map((reference) => (
            <ReferenceListItem key={reference.title}>
              <ReferenceBullet />
              <ReferenceTextGroup>
                <ReferenceListTitle>{reference.title}</ReferenceListTitle>
                <ReferenceListText>{reference.summary}</ReferenceListText>
              </ReferenceTextGroup>
            </ReferenceListItem>
          ))}
        </ReferenceList>
      </CardBody>
    </ReportCard>
  );
}
